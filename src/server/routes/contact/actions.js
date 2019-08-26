

export const contactUs = (req, res) => {
  console.log('Sending email to: ', JSON.stringify(req.body));
  return res.status(200).json({
    message: `Thanks for reaching out. We'll be in touch shortly`
  });
};