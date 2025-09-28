const express = require('express');
const router = express.Router();
const { SiteModel, validateSite } = require('../models/siteModle');

router.get("/", async (req, res) => {
    let data = await SiteModel.find({});
    res.json(data);
}
)

router.get("/:id", async (req, res) => {
    let id = req.params.id;
    let item = await SiteModel.findOne({ _id: id });
    if (!item) {
        res.status(404).json({ msg: "not found" })
        return;
    }
    res.json(item);
});

router.post("/", async (req, res) => {
    let validate = validateSite(req.body);
    if (validate.error) return res.status(400).send(validate.error.details[0].message);
    try {
        let site = new SiteModel(req.body);
        await site.save();
        res.json(site)
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: "There is a problem try again later" })
    }
})
router.delete("/:id", async (req, res) => {
    try {
        let delId = req.params.id;
        let data = await SiteModel.deleteOne({ _id: delId });
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: "There is a problem try again later" })
    }


});
router.put("/:id", async (req, res) => {
  let validBody = validateSite(req.body);
  if (validBody.error) {
    res.status(400).json(validBody.error.details);
    return;
  }
  try {
    let id = req.params.id;
    let data = req.body;
    let result = await SiteModel.updateOne({ _id: id }, data);
    res.json(result);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "There is a problem try again later", err });
  }
});


module.exports = router;