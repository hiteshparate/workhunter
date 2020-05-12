export class User {
    username: string;
    password: string;

}

export class Profile {
    id : number;
    username: string;
    password: string;
    cpassword: string;
    email: string;
    fname: string;
    mname: string;
    lname: string;
    gender: string;
    address: string;
    country: string;
    reports : number;
    image : string;
}

export class UsersJoinJobs{
    id : string;
    client_id : string ;
    title: string ;
    description : string ;
    posteddate : Date ;
    postedby : string ;
    category : string;
    price : string ;
    job_id : string;
    user_id : string;
    applieddate : Date;
    cost : number;
    status : string;
    username : string ;
    email : string;
    fname : string;
    mname : string;
    lname : string;
    image : string;
    address : string ;
    country :string; 
    user_rating : number
}