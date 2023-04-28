class ConfigAPIURL {
  static baseUrl = "http://localhost:4000";

  static signUp = this.baseUrl + "/user/create";
  static updateUser = this.baseUrl + "/user/update";
  static deleteUser = this.baseUrl + "/user/delete";
  static getAllUser = this.baseUrl + "/user/all";
  static login = this.baseUrl + "/user/admin/login";
  static sessionValidation = this.baseUrl + "/user/islogin"; // get
  static logout = this.baseUrl + "/user/logout"; // get

  static createTest = this.baseUrl + "/user/test/create"; // post
  static getAllTest = this.baseUrl + "/user/test/all"; // get
  static getTestsResult = this.baseUrl + "/user/test/result"; // get
  static getUserTest = this.baseUrl + "/user/test"; // post

  // Quiz
  static createQuiz = this.baseUrl + "/user/quiz/create"; // post
  static deleteQuiz = this.baseUrl + "/user/quiz/delete"; // post
  static updateQuiz = this.baseUrl + "/user/quiz/update"; // put
  static getAllQuiz = this.baseUrl + "/user/quiz/all"; // post

  // Dashboard
  static getReport = this.baseUrl + "/user/dashboard"; //get
}
export default ConfigAPIURL;
