const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
    nameOfTheCandidate: {
        type: String,
        required: [true, 'Candidate name is required'],
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        match: [/.+@.+\..+/, 'Enter your Email address'],
    },
    mobileNo: {
        type: String,
        required: [true, 'Mobile number is required'],
        trim: true,
        match: [/^\d{10}$/, 'Enter your valid 10-digit mobile number'],
    },
    dateOfBirth: {
        type: String,
        required: [true, 'Date of birth is required'],
        match: [/^\d{2}-\d{2}-\d{4}$/, 'Enter your DOB, required format DD-MM-YYYY'],
    },
    workExperience: {
        type: String,
        trim: true,
        default: '',
    },
    resumeTitle: {
        type: String,
        trim: true,
        default: '',
    },
    currentLocation: {
        type: String,
        trim: true,
        default: '',
    },
    postalAddress: {
        type: String,
        trim: true,
        default: '',
    },
    currentEmployer: {
        type: String,
        trim: true,
        default: '',
    },
    currentDesignation: {
        type: String,
        trim: true,
        default: '',
    },
}, {
    timestamps: true,
});

candidateSchema.index({ email: 1 });

module.exports = mongoose.model('Candidate', candidateSchema);