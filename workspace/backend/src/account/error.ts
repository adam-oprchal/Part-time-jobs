import { Result } from "@badrap/result"
import assert from "assert"
import { Response } from "express"

function handleDbErrors(errorCode: Error, response: Response) {
    console.log(errorCode.message)

    if (errorCode.message === "P2002") {
        response.status(400).send("unique constraint failed")
    } else if (errorCode.message === "P2003") {
        response.status(400).send("foreign key constraint failed")
    } else if (errorCode.message === "P2025") {
        response.status(404).send("not found")
    } else {
        response.status(500).send("database error")
    }
}

export default handleDbErrors;
