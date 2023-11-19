import { NextResponse } from "next/server";
import { query } from "@/lib/ds";

export const POST = async (req, res) => {
    console.log('POST*******************');
    const data = await req.json();

    let message, status;
    const regNo = data.registration_number;
    const companyName = data.company_name;
    const officeAddress = data.office_address;
    const contactInfo = data.contact_information;
    const email = data.email;
    const username = data.password;

    console.log(regNo + " " + companyName + " " + officeAddress + " " + contactInfo + " " + email);

    const addManufacturer = await query({
        query: "INSERT INTO manufacturers (rno, company_name, office_address, contact_information,email) VALUES (?,?,?,?,?)",
        values: [regNo, companyName, officeAddress, contactInfo, email],
    });

    if (addManufacturer.insertId) {
        message = "Success";
        status = 200;
    } else {
        message = "Error!";
        status = 500;
    }

    return NextResponse.json({ message: message }, { status: status });
};