class LoginUserId{
  constructor(){
    this.state={
      userId:null
    }
  }

  getUserId(){
    return this.state.userId;
  }

  setUserId(userId){
    this.state.userId=userId;
  }
}
const loginUserId=new LoginUserId();
export default loginUserId;