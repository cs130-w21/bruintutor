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
    return createError(e, "server disconnected");
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
    return createError(e, "server disconnected");
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
    return createError(e, "server disconnected");
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
    return createError(e, "server disconnected");
  }
};

export const editProfile = async (
  uid,
  firstName,
  lastName,
  email,
  major,
  year,
  classes
) => {
  try {
    const res = await POST("/profile/edit", {
      uid,
      firstName,
      lastName,
      email,
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
    return createError(e, "server disconnected");
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
    return createError(e, "server disconnected");
  }
};

export const sendMsg = async (from, to, msg) => {
  try {
    const newMsg = {
      from,
      to,
      msg,
      createdDate: new Date().now(),
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
    return createError(e, "server disconnected");
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
    return createError(e, "server disconnected");
  }
};

// Create the initiateRequest send from student side; pass the student UID, tutor UID
// TODO: Link the initiate Request to a request button created in message box
export const initiateRequest = async (studentUID, tutorUID) => {
  try {
    const res = await POST("/match/initate", {
      studentUID,
      tutorUID,
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
    return createError(e, "server disconnected.");
  }
};

// Create the tutorRespondRequest send from tutor side to the backend to deliver the decision
// Link the tutorRespondRequest to a respond button in message box
export const tutorRespondRequest = async (
  studentUID,
  tutorUID,
  requestDecision
) => {
  try {
    const res = await POST("/match/tutorrespond", {
      studentUID,
      tutorUID,
      requestDecision,
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
    return createError(e, "server disconnected.");
  }
};

// Create the get match request for tutor user checking for new tutor requests
// Not sure what to expect for the response? A list of request message?
// TODO: Link this API to a check request button in message box
export const tutorCheckRequest = async (tutorUID) => {
  try {
    const res = await GET("/match/getrequest", {
      tutorUID,
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
    return createError(e, "server disconnected.");
  }
};

// Create the get match request for student user checking for responses of sent requests
// Not sure what to expect for the response? yes/no/pending?
// TODO: Linke this API to a check response button in message box
export const studentCheckResponse = async (studentUID, tutorUID) => {
  try {
    const res = await GET("/match/studentcheckrequest", {
      studentUID,
      tutorUID,
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
    return createError(e, "server disconnected.");
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
    return createError(e, "server disconnected.");
  }
};
