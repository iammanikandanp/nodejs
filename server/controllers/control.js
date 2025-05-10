
import IndicateModel from '../models/indicate.js';



export const registration = async (req, res) => {
  const {
    report,
    dateofreport,
    title,
    incidentno,
    intype,
    dateofindication,
    location,
    city,
    state,
    zipcode,
    discription,
    action,
  } = req.body;

  if (
    !report || !dateofreport || !title || !incidentno || !intype ||
    !dateofindication || !location || !city || !state || !zipcode ||
    !discription || !action
  ) {
    return res.status(400).json({ message: "Please provide all required details." });
  }

  try {
    const newIncident = await IndicateModel.create({
      report,
      dateofreport,
      title,
      incidentno,
      intype,
      dateofindication,
      location,
      city,
      state,
      zipcode,
      discription,
      action,
    });

    res.status(201).json({ message: "Incident registered successfully", data: newIncident });
  } catch (error) {
    console.error("Error saving incident:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// adjust the path as needed

export const updatebyIndicate = async (req, res) => {
  const { id } = req.params;
  const {
    report,
    dateofreport,
    title,
    incidentno,
    intype,
    dateofindication,
    location,
    city,
    state,
    zipcode,
    discription,
    action,
  } = req.body;

  console.log(req.params);
  console.log(req.body);

  try {
    const updatedIncident = await IndicateModel.findByIdAndUpdate(
      id,
      {
        report,
        dateofreport,
        title,
        incidentno,
        intype,
        dateofindication,
        location,
        city,
        state,
        zipcode,
        discription,
        action,
      },
      { new: true }
    );

    if (!updatedIncident) {
      return res.status(400).json({
        message: "Please provide a valid ID",
      });
    }

    res.status(200).json({
      message: "Data updated successfully",
      data: updatedIncident,
    });
  } catch (error) {
    console.error("Error updating incident:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const deleteByIncident = async (req, res) => {
  const { id } = req.params;

  try {
    const incident = await IndicateModel.findByIdAndDelete(id);

    if (!incident) {
      return res.status(404).json({ message: "Incident not found" });
    }

    res.status(200).json({ message: "Incident deleted successfully" });
  } catch (error) {
    console.error("Error deleting incident:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
  
export const fetchbyid = async (req, res) => {
  try {
    const { id } = req.params;
    const incident = await IndicateModel.findById(id);

    if (!incident) {
      return res.status(404).json({ message: "Incident not found" });
    }

    res.status(200).json({
      message: "Incident fetched successfully",
      data: incident,
    });
  } catch (error) {
    console.error("Error fetching incident:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const fetch = async (req, res) => {
  try {
    const fetching = await IndicateModel.find({});

    if (!fetching || fetching.length === 0) {
      return res.status(404).json({ message: "No incidents found" });
    }

    res.status(200).json({
      message: "Data fetched successfully",
      data: fetching,
    });
  } catch (error) {
    console.error("Error fetching incidents:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const count =async(req,res)=>{
  try {
    const counts=await IndicateModel.countDocuments()
    if (!counts || counts.length === 0) {
      return res.status(404).json({ message: "No incidents found" });
    }
    res.status(200).json({
      data:counts
    })
  } catch (error) {
    console.error("Error count incidents:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}