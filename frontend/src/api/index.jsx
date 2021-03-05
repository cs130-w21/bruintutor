const HOST = "http://localhost:8080/api";

const POST = async (endpoint, data, extraOptions) => {
  const response = await fetch(HOST + endpoint, {
    method: "POST",
    cache: "no-cache",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    ...extraOptions,
  });
  return response;
};

const GET = async (endpoint, extraOptions) => {
  const response = await fetch(HOST + endpoint, {
    method: "GET",
    cache: "no-cache",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    ...extraOptions,
  });
  return response;
};

const createError = (e, errMsg = null) => {
  return { error: true, e, errMsg };
};

const createSuccess = (data) => {
  return { error: false, data };
};

export const signUpUser = async (
  firstName,
  lastName,
  email,
  password,
  isTutor
) => {
  try {
    const res = await POST("/auth/register", {
      firstName,
      lastName,
      email,
      password,
      isTutor,
    });
    if (res.status !== 200) {
      return createError(res, "Status Error: " + res.status);
    }
    const data = await res.json();
    if (data.error) {
      return createError(null, data.errMsg);
    } else {
      return createSuccess(data.payload);
    }
  } catch (e) {
    return createError(e, "server not working for signing up ");
  }
};

export const signInRequest = async (email, password) => {
  try {
    const res = await POST("/auth/login", {
      email,
      password,
    });
    if (res.status !== 200) {
      return createError(res, "Status Error: " + res.status);
    }
    const data = await res.json();
    if (data.error) {
      return createError(null, data.errMsg);
    } else {
      return createSuccess(data.payload);
    }
  } catch (e) {
    return createError(e, "server not working for signing in ");
  }
};

export const logOutRequest = async () => {
  try {
    const res = await GET("/auth/logout");
    if (res.status !== 200) {
      return createError(res, "Status Error: " + res.status);
    }
    const data = await res.json();
    if (data.error) {
      return createError(null, data.errMsg);
    } else {
      return createSuccess(data.payload);
    }
  } catch (e) {
    return createError(e, "server not working for signing in ");
  }
};

export const forgotPwd = async (email) => {
  try {
    const res = await POST("/auth/forgot", {
      email,
    });
    if (res.status !== 200) {
      return createError(res, "Status Error: " + res.status);
    }
    const data = await res.json();
    if (data.error) {
      return createError(null, data.errMsg);
    } else {
      return createSuccess(data.payload);
    }
  } catch (e) {
    return createError(e, "server not working for forgetting password");
  }
};

export const resetPwd = async (password, secret) => {
  try {
    const res = await POST("/auth/reset", {
      secret,
      password,
    });
    if (res.status !== 200) {
      return createError(res, "Status Error: " + res.status);
    }
    const data = await res.json();
    if (data.error) {
      return createError(null, data.errMsg);
    } else {
      return createSuccess(data.payload);
    }
  } catch (e) {
    return createError(e, "server not working for resetting password");
  }
};

export const editProfile = async (
  uid,
  firstName,
  lastName,
  major,
  year,
  classes
) => {
  try {
    const res = await POST("/profile/edit", {
      uid,
      firstName,
      lastName,
      major,
      year,
      classes,
    });
    if (res.status !== 200) {
      return createError(res, "Status Error: " + res.status);
    }
    const data = await res.json();
    if (data.error) {
      return createError(null, data.errMsg);
    } else {
      return createSuccess(data.payload);
    }
  } catch (e) {
    return createError(e, "server not working for editing profile");
  }
};

export const getProfile = async (uid) => {
  try {
    const res = await POST("/profile/get", {
      uid,
    });
    if (res.status !== 200) {
      return createError(res, "Status Error: " + res.status);
    }
    const data = await res.json();
    if (data.error) {
      return createError(null, data.errMsg);
    } else {
      return createSuccess(data.payload);
    }
  } catch (e) {
    return createError(e, "server not working for getting profile");
  }
};

export const sendMsg = async (from, to, msg) => {
  try {
    const newMsg = {
      from,
      to,
      msg,
      createdDate: Date.now(),
    };
    const res = await POST("/message/add", newMsg);
    if (res.status !== 200) {
      return createError(res, "Status Error: " + res.status);
    }
    const data = await res.json();
    if (data.error) {
      return createError(null, data.errMsg);
    } else {
      return createSuccess(newMsg);
    }
  } catch (e) {
    return createError(e, "server not working for sending messages");
  }
};

export const getMsgs = async (uid1, uid2) => {
  try {
    const res = await POST("/message/get", {
      uid1,
      uid2,
    });
    if (res.status !== 200) {
      return createError(res, "Status Error: " + res.status);
    }
    const data = await res.json();
    if (data.error) {
      return createError(null, data.errMsg);
    } else {
      return createSuccess(data.payload);
    }
  } catch (e) {
    return createError(e, "server not working for getting messages");
  }
};

export const tutorRespondRequest = async (student, tutor) => {
  try {
    const res = await POST("/match/tutorrespond", {
      student,
      tutor,
    });
    if (res.status != 200) {
      return createError(res, "Status Error: " + res.status);
    }
    const data = await res.json();
    if (data.error) {
      return createError(null, data.errMsg);
    } else {
      return createSuccess(data.payload);
    }
  } catch (e) {
    return createError(e, "server not working for tutor response request.");
  }
};

// Selected Class Category
export const getClassList = async (subjectArea) => {
  try {
    const res = await POST("/classList/get", {
      subjectArea,
    });
    if (res.status != 200) {
      return createError(res, "Status Error: " + res.status);
    }
    const data = await res.json();
    if (data.error) {
      return createError(null, data.errMsg);
    } else {
      return createSuccess(data.payload);
    }
  } catch (e) {
    return createError(e, "server not working for getting class list.");
  }
};

export const getNotifications = async (uid) => {
  try {
    const res = await POST("/notification/get", {
      uid,
    });
    if (res.status != 200) {
      return createError(res, "Status Error: " + res.status);
    }
    const data = await res.json();
    if (data.error) {
      return createError(null, data.errMsg);
    } else {
      return createSuccess(data.payload);
    }
  } catch (e) {
    return createError(e, "server not working for getting notifications.");
  }
};

export const addNotification = async (uid, notification) => {
  try {
    const res = await POST("/notification/add", {
      uid,
      notification,
    });
    if (res.status != 200) {
      return createError(res, "Status Error: " + res.status);
    }
    const data = await res.json();
    if (data.error) {
      return createError(null, data.errMsg);
    } else {
      return createSuccess(data.payload);
    }
  } catch (e) {
    return createError(e, "server not working for adding notifications.");
  }
};

export const deleteNotification = async (uid, notificationID) => {
  try {
    const res = await POST("/notification/delete", {
      uid,
      notificationID,
    });
    if (res.status != 200) {
      return createError(res, "Status Error: " + res.status);
    }
    const data = await res.json();
    if (data.error) {
      return createError(null, data.errMsg);
    } else {
      return createSuccess(data.payload);
    }
  } catch (e) {
    return createError(e, "server not working for deleting notifications.");
  }
};

export const uploadProfilePicture = async (uid, profilePicUrl) => {
  try {
    const res = await POST("/profile/pictureUpload", {
      uid,
      profilePicUrl,
    });
    if (res.status != 200) {
      return createError(res, "Status Error: " + res.status);
    }
    const data = await res.json();
    if (data.error) {
      return createError(null, data.errMsg);
    } else {
      return createSuccess(data.payload);
    }
  } catch (e) {
    return createError(e, "server not working for uploading profile picture.");
  }
};

export const downloadProfilePicture = async (uid) => {
  try {
    const res = await POST("/profile/pictureDownload", {
      uid,
    });
    if (res.status != 200) {
      return createError(res, "Status Error: " + res.status);
    }
    const data = await res.json();
    if (data.error) {
      return createError(null, data.errMsg);
    } else {
      return createSuccess(data.payload);
    }
  } catch (e) {
    return createError(
      e,
      "server not working for downloading profile picture."
    );
  }
};

export const getSchedule = async (uid) => {
  try {
    const res = await POST("/schedule/get", {
      uid,
    });
    if (res.status != 200) {
      return createError(res, "Status Error: " + res.status);
    }
    const data = await res.json();
    if (data.error) {
      return createError(null, data.errMsg);
    } else {
      return createSuccess(data.payload);
    }
  } catch (e) {
    return createError(e, "server not working for getting schedules.");
  }
};

export const setSchedule = async (uid, bytes) => {
  try {
    const res = await POST("/schedule/set", {
      uid,
      bytes,
    });
    if (res.status != 200) {
      return createError(res, "Status Error: " + res.status);
    }
    const data = await res.json();
    if (data.error) {
      return createError(null, data.errMsg);
    } else {
      return createSuccess(data.payload);
    }
  } catch (e) {
    return createError(e, "server not working for setting schedules.");
  }
};

export const getUid = async () => {
  try {
    const res = await GET("/auth/getuid");
    if (res.status != 200) {
      return createError(res, "Status Error: " + res.status);
    }
    const data = await res.json();
    if (data.error) {
      return createError(null, data.errMsg);
    } else {
      return createSuccess(data.payload);
    }
  } catch (e) {
    return createError(e, "server not working for getting uid.");
  }
};

export const getContacts = async (uid) => {
  try {
    const res = await POST("/match/getUserList", {
      uid,
    });
    if (res.status != 200) {
      return createError(res, "Status Error: " + res.status);
    }
    const data = await res.json();
    if (data.error) {
      return createError(null, data.errMsg);
    } else {
      return createSuccess(data.payload);
    }
  } catch (e) {
    return createError(e, "server not working for getting contacts.");
  }
};

export const searchTutors = async (name, classes, bytes) => {
  try {
    const res = await POST("/search/get", {
      name,
      classes,
      bytes,
    });
    if (res.status != 200) {
      return createError(res, "Status Error: " + res.status);
    }
    const data = await res.json();
    if (data.error) {
      return createError(null, data.errMsg);
    } else {
      return createSuccess(data.payload);
    }
  } catch (e) {
    return createError(e, "server not working for searching tutors.");
  }
};
