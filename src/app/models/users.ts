/**
 * Created by annakim on 2017. 2. 20..
 */

export class Users {
    constructor
    (public email: string,
     public firstName: string,
     public lastName: string,
     public phone:string,
     public sns:string,
     public url:string,
     public user: {
         id: "string",
         fingerId: "string",
         status: "string",
         lat: "string",
         lng: "string",
         createdAt: "string",
         updatedAt: "string",
         UserId:"string"
     },
     public gps: {
         lat: number,
         lng: number
     }) {
    };

}
