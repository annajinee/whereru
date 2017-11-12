/**
 * Created by annakim on 2017. 2. 20..
 */

export class Status {
    constructor
    (public id: string,
     public fingerId: string,
     public status: string,
     public user: {
         firstName: "string",
         lastName: "string",
         email: "string",
         phone: "string",
         sns: "string",
         url: "string",
         updatedAt: "string"
     },
     public gps: {
         lat: number,
         lng: number
     }) {
    };

}
