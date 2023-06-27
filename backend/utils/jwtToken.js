// create token and saving that in cookies
const sendToken = (user, statusCode, res) => {
    const token = user.getJwtToken();
    const { role } = user; // Lấy thông tin vai trò từ đối tượng người dùng
    
    // Options for cookies
    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      sameSite: "none",
      secure: true,
    };
  
    res
      .status(statusCode)
      .cookie("token", token, options)
      .json({
      success: true,
      user: { ...user._doc, role }, // Gửi thông tin vai trò trong đối tượng người dùng
      token,
    });
  };
  
  module.exports = sendToken;