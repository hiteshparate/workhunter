export class Category {
    jcategory : string;
   
}

export class jobs{
    id : number
    title : string;
    description : string;
    category : string;
    imageurl : string;
    price : number;
    posteddate : Date;
    postedby : string;
    status : string;
}

export class applyJob{
    id: number;
    user_id : number;
    job_id : number;
    applideddate : Date;
    cost : number;
    status : string;
    client_rating : number;
    user_rating : number;
}
