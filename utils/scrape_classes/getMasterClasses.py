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

def main():
	# Setup
	if len(sys.argv) != 1:
		sys.stderr.write("Error: Usage is python3 getMasterClasses.py\n")
		sys.exit(1)
	if os.path.exists("MasterClasses.csv"):
		os.remove("MasterClasses.csv")
	
	driver = webdriver.Chrome(ChromeDriverManager().install())
	driver.get("https://www.registrar.ucla.edu/Academics/Course-Descriptions")
	content = driver.page_source
	soup = BeautifulSoup(content, features="html.parser")
	
	# Get all links to check
	for link in soup.find_all('a'):
		tempLink = str(link.get("href"))
		if "funsel=3" in tempLink:
			SubjectAreaLinks.append("https://www.registrar.ucla.edu{}".format(tempLink))
			
	
	# Parsing Each Page
	for link in SubjectAreaLinks:
		driver.get(link)
		content = driver.page_source
		soup = BeautifulSoup(content, features="html.parser")
		headers = soup.find_all("div", class_="page-header")
		header = headers[1].find_all("span")[0].getText()
		SubjectAreaHeaders.append(header)
		classes = []
		for aClass in soup.find_all("div", class_="media-body"):
			classes.append(aClass.find_all("h3")[0].getText())
		SubjectAreaClasses.append(classes)

	# Write to CSV
	try:
		with open("MasterClasses.csv", "w") as outputFile:
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
				
				for bClass in SubjectAreaClasses[i]:
					splitter = bClass.split(". ")
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
						
					writer.writerow([headerName, headerAcronym, classNum, className])
	except (IOError, OSError):
		sys.stderr.write("Error: Unable to write to csv file\n")
		sys.exit(1)

	sys.exit(0)

if __name__ == "__main__":
	main()
