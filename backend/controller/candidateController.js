const async = require("async");
const { parseExcel } = require("../excelParser");
const Candidate = require("../models/candidateModel");

const sendResponse = (res, statusCode, message, data = {}) =>
    res.status(statusCode).json({ message, ...data });

const uploadCandidates = async(req, res) => {
    try {
        const candidates = await parseExcel(req.file.path);
        const errors = [];
        const successes = [];
        await new Promise((resolve, reject) => {
            async.eachSeries(
                candidates,
                async(candidate, callback) => {
                    try {
                        const existingCandidate = await Candidate.findOne({ email: candidate.email });

                        if (existingCandidate) {
                            console.log(`Duplicate candidate detected: ${candidate.email}`);
                            return;
                        }

                        await Candidate.updateOne({ email: candidate.email }, { $set: candidate }, { upsert: true });

                        successes.push(candidate.email);
                    } catch (error) {
                        console.error(`Error processing candidate: ${candidate.email}`, error);
                        errors.push(`Failed to process candidate: ${candidate.email}`);
                        callback(error);
                    }

                },
                (err) => {
                    (err) ? reject(err): resolve();
                }
            );
        });

        if (errors.length) {
            return sendResponse(res, 500, `${errors.length} candidate information failed to process.`, { errors, processed: successes });
        }
        sendResponse(res, 200, "File Uploaded Successfully", {
            processed: successes,
        });
    } catch (error) {
        console.error("Error Encountered, file upload unsuccessful:", error);
        sendResponse(res, 500, "parsing Excel file get intruppted", {
            error: error.message,
        });
    }
};

module.exports = { uploadCandidates };