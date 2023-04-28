import React, { useEffect } from "react";
import "./Table.scss";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import {
  Button,
  selectClasses,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import Sidebar from "../../components/sidebar/Sidebar";
// import DashNavbar from "../../components/navbar/DashNavbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import ConfigAPIURL from "../../config/ConfigAPIURL";
import APIRequest from "../../utils/APIRequest";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import MuiAlert from "@mui/material/Alert";
import isEmpty from "../../utils/isEmpty";
import { useNavigate, useLocation } from "react-router-dom";

const defaultQuizValue = {
  isMultiAnswer: false,
  category: "",
  question: "",
  options: ["", ""],
  answer: [],
};

const categoryList = [
  "Stack",
  "Queue",
  "Linked List",
  "Hash Table",
  "Bubble Sort",
  "Insertion Sort",
  "Selection Sort",
  "Merge Sort",
  "Heap Sort",
  "Binary Search",
  "Linear Search",
];

function Table(props) {
  const [open, setOpen] = React.useState(false);
  const [errorOpen, setErrorOpen] = React.useState(false);

  const [transition, setTransition] = React.useState(undefined);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  function TransitionDown(props) {
    return <Slide {...props} direction="down" />;
  }

  let navigate = useNavigate();
  const location = useLocation();
  // const [open, setOpen] = React.useState(false);

  const [quiz, setQuiz] = useState(props.data ? props.data : defaultQuizValue);

  // const history = useHistory();

  useEffect(() => {
    setQuiz(props.data ? props.data : defaultQuizValue);
  }, [props.data]);

  // useEffect(() => {
  //   if (
  //     location.pathname === location.pathname &&
  //     location.search === location.search
  //   ) {
  //     setQuiz(defaultQuizValue);
  //   }
  // }, [location]);

  const handleSelectTopicChange = (event) => {
    // setSelectedTopicOption(event.target.value);
    setQuiz({
      ...quiz,
      category: event.target.value,
    });
  };
  const handleSelectAnswerChange = (event) => {
    console.log(event.target.value);
    if (event.target.value == 2) {
      setQuiz({
        ...quiz,
        isMultiAnswer: false,
      });
    } else if (event.target.value == 3) {
      setQuiz({
        ...quiz,
        isMultiAnswer: true,
      });
    }
  };

  const saveQuiz = () => {
    let apiUrl = ConfigAPIURL.createQuiz;
    let method = "POST";
    if (props.data) {
      apiUrl = ConfigAPIURL.updateQuiz;
      method = "PUT";
    }
    APIRequest.request(method, apiUrl, JSON.stringify(quiz)).then((res) => {
      if (!isEmpty(res)) {
        console.log(res);
        if (res.code === 100) {
          if (res.data.responseCode === 109) {
            console.log("User created.");
            setQuiz({ ...defaultQuizValue });
            setOpen(true);
            // setTimeout(() => {
            //   navigate("/quiz/list");
            // }, 1000);
          }
        }
        if (res.data.responseCode === 114) {
          setErrorOpen(true);
          console.log(errorOpen);
          // setTimeout(() => {
          //   navigate("/users");
          // }, 1000);

          // SnackbarUtils.warn(
          //   "You are already registered. Please log in.",
          //   "bottomCenter",
          //   3000
          // ).then((notification) => props.publishNotification(notification));
        }
      }
    });
  };

  console.log("Quiz: ", quiz);
  return (
    <>
      <Box>
        <Paper className="topPaper" elevation={5}>
          <Grid container spacing={2} alignItems="flex-end">
            <Grid item sm={12} md={6} lg={6}>
              <div className="topContainer">
                <div className="header">
                  <h1>{props.data ? "Edit Quiz" : "Add Quiz"}</h1>
                </div>

                <div className="container">
                  <form>
                    <div className="topicTitle">
                      <div className="formInput">
                        <label>Topic</label>
                        {/* <TextField
                          label="Category"
                          value={props.data.category}
                        /> */}

                        <select
                          id="topic"
                          value={quiz.category}
                          onChange={handleSelectTopicChange}
                          required
                        >
                          <option value="" selected disabled hidden>
                            Select Topic
                          </option>
                          {categoryList.map((item) => (
                            <option value={item}>{item}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </Grid>

            <Grid item sm={12} md={6} lg={6}>
              <div className="ansType">
                <div className="formInput">
                  <label>Type</label>
                  <select
                    id="type"
                    // value={
                    //   quiz.isMultiAnswer ? "Multiple Answers" : "Single Answer"
                    // }
                    onChange={handleSelectAnswerChange}
                    required
                    defaultValue={!quiz.isMultiAnswer ? 2 : 3}
                  >
                    <option value={1} disabled>
                      Select Type
                    </option>
                    <option value={2}>Single Answer</option>
                    <option value={3}>Multiple Answers</option>
                  </select>
                </div>
              </div>
            </Grid>
          </Grid>
        </Paper>
      </Box>

      <Box>
        {quiz.category !== "" ? (
          <Paper elevation={5} className="bottomPaper">
            <Grid container spacing={0}>
              <div className="bottom">
                <div className="left"></div>
                <div className="right">
                  <form>
                    <Grid container item alignItems="flex-end" spacing={1}>
                      <Grid item className="question" xs={12}>
                        <div className="formInput">
                          <label>Question</label>
                          <TextField
                            // className="input"
                            style={{ border: "none" }}
                            variant="standard"
                            fullWidth
                            value={quiz.question}
                            type="text"
                            placeholder="Write the Question Content"
                            required
                            onChange={(e) => {
                              setQuiz({
                                ...quiz,
                                question: e.target.value,
                              });
                            }}
                            multiline
                          />
                        </div>
                      </Grid>
                    </Grid>
                    <Grid container rowSpacing={3}>
                      {quiz.options.map((item, index) => (
                        <Grid container xs={6} sm={12} lg={6} key={index}>
                          <FormControlLabel
                            checked={quiz.answer.includes(index)}
                            // value={quiz.answer}
                            disabled={
                              !quiz.isMultiAnswer &&
                              quiz.answer.length > 0 &&
                              !quiz.answer.includes(index)
                            }
                            onChange={(e) => {
                              const newAnswer = [...quiz.answer];
                              if (newAnswer.includes(index)) {
                                newAnswer.splice(newAnswer.indexOf(index), 1);
                              } else {
                                newAnswer.push(index);
                              }
                              setQuiz({ ...quiz, answer: newAnswer });
                            }}
                            control={<Checkbox />}
                            style={{ margin: 0, padding: 0, marginTop: 10 }}
                          />
                          <div className="formInput">
                            <label>Option {index + 1}</label>
                            <TextField
                              style={{ border: "none" }}
                              variant="standard"
                              fullWidth
                              multiline
                              type="text"
                              name="opt1"
                              placeholder="Write the Option"
                              value={quiz.options[index]}
                              onChange={(e) => {
                                let arr = [...quiz.options];
                                arr[index] = e.target.value;
                                setQuiz({
                                  ...quiz,
                                  options: [...arr],
                                });
                              }}
                              required
                            />
                          </div>
                          <div>
                            <IconButton
                              sx={{ mt: 3 }}
                              onClick={() => {
                                let arr = [...quiz.options];

                                // only splice array when item is found
                                arr.splice(index, 1); // 2nd parameter means remove one item only

                                setQuiz({
                                  ...quiz,
                                  options: [...arr],
                                });
                              }}
                              disabled={quiz.options.length < 3}
                            >
                              <RemoveIcon />
                            </IconButton>
                          </div>
                        </Grid>
                      ))}
                    </Grid>
                    <IconButton
                      onClick={() => {
                        let arr = [...quiz.options];

                        arr.push("");
                        setQuiz({
                          ...quiz,
                          options: [...arr],
                        });
                      }}
                      disabled={quiz.options.length > 3}
                    >
                      <AddIcon />
                    </IconButton>

                    <Grid item xs={12}>
                      <Button
                        className="button"
                        variant="outlined"
                        href="#"
                        onClick={saveQuiz}
                      >
                        {props.data ? "Update Quiz" : "Save Quiz"}
                      </Button>

                      {/* <Button variant="contained" id="sub" onClick={() => addUserDetails()}> */}

                      {/* </Button> */}
                    </Grid>
                  </form>
                </div>
              </div>
            </Grid>
          </Paper>
        ) : (
          <></>
        )}
        {/* <Snackbar
          open={open}
          onClose={() => setOpen(false)}
          TransitionComponent={TransitionLeft}
          message="Quiz added successfully!"
          key={TransitionLeft ? TransitionLeft.name : ""}
        /> */}
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          autoHideDuration={3000}
          onClose={() => setOpen(false)}
          TransitionComponent={transition}
          message="I love snacks"
          key={transition ? transition.name : ""}
        >
          {errorOpen == true ? (
            <Alert severity="error" sx={{ width: "100%" }}>
              Quiz Already Exists!
            </Alert>
          ) : (
            <Alert severity="success" sx={{ width: "100%" }}>
              Quiz Added Successfully!
            </Alert>
          )}
        </Snackbar>
      </Box>
    </>
  );
}

export default Table;
