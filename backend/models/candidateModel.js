const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema(
    {
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
            match: [/.+@.+\..+/, 'Please enter a valid email address'],
        },
        mobileNo: {
            type: String,
            required: [true, 'Mobile number is required'],
            trim: true,
            match: [/^\d{10}$/, 'Please enter a valid 10-digit mobile number'],
        },
        dateOfBirth: {
            type: String,
            required: [true, 'Date of birth is required'],
            match: [/^\d{4}-\d{2}-\d{2}$/, 'Please use the format YYYY-MM-DD'],
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
    },
    {
        timestamps: true, 
    }
);

candidateSchema.index({ email: 1 });

module.exports = mongoose.model('Candidate', candidateSchema);
