class Data {
  is_change_password?: string;
  name?: string;
  parent_id?: number;
  token?: string;
  user_id?: number;
  user_name?: string;
  user_type_id?: number;
  referred_code?:string
}
export class User {
  data?: Data;
  errors?: string;
  message?: string;
  status?: boolean;
  user_type={
    1: "Tech Admin",
    2: "Super Admin",
    3: "Admin",
    4: "Super Master",
    5: "Master",
    6: "Super Agent",
    7: "Agent",
    8: "User"
  }
  setData(data:any) {
    localStorage.setItem('adminUser', JSON.stringify(data));
  }
  // Gets Data from storage.
  getData() {
    let getLocalData:any=localStorage.getItem('adminUser')
    return JSON.parse(getLocalData);
  }

  // Sets token to storage
  setToken(token: string) {
    localStorage.setItem('tokenAdmin', token);
  }

  // Gets the token from storage
  getToken() {
    return localStorage.getItem('tokenAdmin');
  }

  // checks if user is loggedin
  isLoggedIn() {
    return this.getToken() !== null;
  }

}
