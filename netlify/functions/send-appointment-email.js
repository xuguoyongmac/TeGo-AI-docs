const nodemailer = require('nodemailer');

exports.handler = async (event) => {
  // 只允许 POST 请求
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // 解析请求体
    const data = JSON.parse(event.body);
    
    // 验证必填字段
    if (!data.name || !data.phone || !data.appointmentTime || !data.verificationCode) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: '缺少必填字段' })
      };
    }

    // 创建邮件传输器
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 587,
      secure: process.env.SMTP_PORT === '465', // 465 端口使用 SSL
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    // 邮件内容
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.RECIPIENT_EMAIL || 'xuguoyong@zhama.com',
      subject: `新的产品演示预约 - ${data.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3b82f6;">新的产品演示预约</h2>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e293b; margin-top: 0;">预约信息</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: 600; color: #374151;">姓名：</td>
                <td style="padding: 8px 0; color: #64748b;">${data.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: 600; color: #374151;">联系方式：</td>
                <td style="padding: 8px 0; color: #64748b;">${data.phone}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: 600; color: #374151;">联系邮箱：</td>
                <td style="padding: 8px 0; color: #64748b;">${data.email || '未填写'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: 600; color: #374151;">预约时间：</td>
                <td style="padding: 8px 0; color: #64748b;">${new Date(data.appointmentTime).toLocaleString('zh-CN')}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: 600; color: #374151;">备注信息：</td>
                <td style="padding: 8px 0; color: #64748b;">${data.message || '无'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: 600; color: #374151;">提交时间：</td>
                <td style="padding: 8px 0; color: #64748b;">${new Date().toLocaleString('zh-CN')}</td>
              </tr>
            </table>
          </div>
          
          <div style="background: #fef3c7; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b;">
            <p style="margin: 0; color: #92400e;">
              <strong>注意：</strong>请及时联系客户确认演示时间，并做好相关准备工作。
            </p>
          </div>
          
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">
              此邮件由 TeGo-AI 预约系统自动发送，请勿直接回复。
            </p>
          </div>
        </div>
      `
    };

    // 发送邮件
    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: '预约信息提交成功！我们会尽快与您联系确认演示时间。',
        success: true 
      })
    };

  } catch (error) {
    console.error('发送邮件失败:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: '邮件发送失败，请稍后重试或联系客服。',
        success: false 
      })
    };
  }
};
