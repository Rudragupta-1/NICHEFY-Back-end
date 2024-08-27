import { Company } from "../models/company.model.js";
export const registerCompany = async (req, rep) => {
    try {
        const { companyName } = req.body;
        if (!companyName) {
            return rep.status(400).json({
                message: "Company name is required",
                success: false
            })
        }
        let company = Company.find({ name: companyName });
        if (company) {
            return rep.status(400).json({
                message: "You can't register the same company",
                success: true
            })
        }
        company = await Company.create({
            name: companyName,
            userId: req.id
        })
        return rep.status(200).json({
            message: "Company registered successfully",
            success: true
        })
    }
    catch (error) {
        console.log(error);
        return rep.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}

export const getCompany = async (req, rep) => {
    try {
        const userId = req.id;
        let companies = Company.find({ userid });
        if (!companies) {
            return rep.status(404).json({
                message: "Companies not found",
                success: false
            })
        }
    }
    catch (error) {
        console.log(error);
        return rep.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}
export const getCompanyById = async (req, rep) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) {
            return rep.status(404).json({
                message: "Company not found",
                success: false
            })
        }
        return rep.status(200).json({
            company,
            success: true
        })
    }
    catch (error) {
        console.log(error);
        return rep.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}
export const updateCompany = async (req, rep) => {
    try {
        const { name, description, website, location } = req.body;
        const file = req.file;
        const updateData = { name, description, website, company };
        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!company) {
            return rep.status(404).json({
                message: "Company not found",
                success: false
            })
        }
        return rep.status(200).json({
            message: "Company information updated",
            success: true
        })
    }
    catch (error) {
        console.log(error);
        return rep.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}