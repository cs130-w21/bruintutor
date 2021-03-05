#!/usr/bin/env python3
import re, sys, string, csv, os
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
import pandas as pd

# Global Vars
SubjectAreaLinks = []
SubjectAreaHeaders = []
SubjectAreaClasses = []
QuarterSubjectAreaLinks = []
QuarterSubjectAreaClasses = []

def main():
	# Setup
	if len(sys.argv) != 1:
		sys.stderr.write("Error: Usage is python3 getQuarterClasses.py\n")
		sys.exit(1)
	if os.path.exists("WinterQuarterClasses.csv"):
		os.remove("WinterQuarterClasses.csv")
	
	driver = webdriver.Chrome(ChromeDriverManager().install())
	driver.get("https://www.registrar.ucla.edu/Academics/Course-Descriptions")
	content = driver.page_source
	soup = BeautifulSoup(content, features="html.parser")
	
	# Get all links to check
	for link in soup.find_all('a'):
		tempLink = str(link.get("href"))
		if "funsel=3" in tempLink:
			SubjectAreaLinks.append("https://www.registrar.ucla.edu{}".format(tempLink))
			
	
	# Get each header
	for link in SubjectAreaLinks:
		driver.get(link)
		content = driver.page_source
		soup = BeautifulSoup(content, features="html.parser")
		headers = soup.find_all("div", class_="page-header")
		header = headers[1].find_all("span")[0].getText()
		SubjectAreaHeaders.append(header)
		
	# Parse each page and get secondary links
	for i in range(len(SubjectAreaHeaders)):
		splitted = SubjectAreaHeaders[i].split(" (")
		headerName = ""
		headerAcronym = ""
		
		try:
			headerName = splitted[0]
		except (IndexError):
			sys.stderr.write("Error: Unable to read headerName\n")
			headerName = ""
		try:
			headerAcronym = splitted[1].replace(")", "")
		except (IndexError):
			sys.stderr.write("Error: Unable to read headerAcronym\n")
			headerAcronym = ""
		
		# Create the links
		first = ""
		second = ""
		headerName = headerName.replace(" ", "+");
		if not headerAcronym:
			headerAcronym = headerName.upper() + "+++++++"
			headerAcronym = headerAcronym[:7]
			first = headerName
			second = headerAcronym
		elif "&" in headerAcronym:
			headerAcronym = headerAcronym.replace("&", "%26")
			first = headerName + "+(" + headerAcronym + ")"
			second = headerAcronym
		else:
			headerAcronym.replace(" ", "+")
			first = headerName + "+(" + headerAcronym + ")"
			second = headerAcronym
		
		QuarterSubjectAreaLinks.append("https://sa.ucla.edu/ro/public/soc/Results?SubjectAreaName={}&t=21W&sBy=subject&subj={}&catlg=&cls_no=&undefined=Go&btnIsInIndex=btn_inIndex".format(first, second))

	# Parse links for quarter classes
	for link in QuarterSubjectAreaLinks:
		driver.get(link)
		content = driver.page_source
		soup = BeautifulSoup(content, features="html.parser")
		classResults = soup.find_all("h3", class_="head")
		classes = []
		for classResult in classResults:
			classes.append(classResult.find_all("a")[0].getText())
		QuarterSubjectAreaClasses.append(classes)

	# Write to CSV
	try:
		with open("WinterQuarterClasses.csv", "w") as outputFile:
			writer = csv.writer(outputFile)
			writer.writerow(["Subject Area Name", "Subject Acronym", "Class Number", "Class Name"])
			for i in range(len(SubjectAreaHeaders)):
				splitted = SubjectAreaHeaders[i].split(" (")
				headerName = ""
				headerAcronym = ""
				
				try:
					headerName = splitted[0]
				except (IndexError):
					sys.stderr.write("Error: Unable to read headerName\n")
					headerName = ""
				try:
					headerAcronym = splitted[1].replace(")", "")
				except (IndexError):
					sys.stderr.write("Error: Unable to read headerAcronym\n")
					headerAcronym = ""
				
				for bClass in QuarterSubjectAreaClasses[i]:
					splitter = bClass.split(" - ")
					classNum = ""
					className = ""
					
					try:
						classNum = splitter[0]
					except (IndexError):
						sys.stderr.write("Error: Unable to read classNum")
						classNum = ""
					try:
						className = splitter[1];
					except (IndexError):
						sys.stderr.write("Error: Unable to read className")
						className = ""
						
					writer.writerow([headerName.strip(), headerAcronym.strip(), classNum.strip(), className.strip()])
	except (IOError, OSError):
		sys.stderr.write("Error: Unable to write to csv file\n")
		sys.exit(1)

	sys.exit(0)

if __name__ == "__main__":
	main()
