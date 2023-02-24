const Withdraw = require("../model/withdraw");

// Create a new withdraw transaction
exports.createWithdraw = async (req, res) => {
  try {
    const withdraw = new Withdraw({
      email: req.body.email,
      currency: req.body.currency,
      network: req.body.network,
      amount: req.body.amount,
      walletaddress: req.body.walletaddress,
      withdawamount: req.body.withdawamount
    });
    await withdraw.save();
    res.send(withdraw);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all withdraw transactions
exports.getWithdraws = async (req, res) => {
  try {
    const withdraws = await Withdraw.find();
    res.send(withdraws);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get a specific withdraw transaction by ID
exports.getWithdraw = async (req, res) => {
  try {
    const withdraw = await Withdraw.findById(req.params.id);
    res.send(withdraw);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Update a specific withdraw transaction by ID
exports.updateWithdraw = async (req, res) => {
  try {
    const withdraw = await Withdraw.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.send(withdraw);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a specific withdraw transaction by ID
exports.deleteWithdraw = async (req, res) => {
  try {
    const withdraw = await Withdraw.findByIdAndRemove(req.params.id);
    res.send(withdraw);
  } catch (error) {
    res.status(400).send(error);
  }
};
