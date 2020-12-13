import { userInfo } from "os";

export default function(userID: String) {
    return userID.substring(3, userID.length - 1);
}