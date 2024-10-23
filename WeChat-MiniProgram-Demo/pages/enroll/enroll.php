<?php  
// 设置响应头，返回 JSON 格式  
header('Content-Type: application/json; charset=utf-8');  

// 数据库配置  
$host = 'localhost'; // 数据库主机  
$db_user = 'your_db_username'; // 数据库用户名  
$db_pass = 'your_db_password'; // 数据库密码  
$db_name = 'your_db_name'; // 数据库名称  

// 创建数据库连接  
$conn = new mysqli($host, $db_user, $db_pass, $db_name);  

// 检查连接  
if ($conn->connect_error) {  
    die(json_encode(array("status" => "数据库连接失败")));  
}  

// 从 POST 请求中获取数据  
$username = isset($_POST['username']) ? $_POST['username'] : '';  
$password = isset($_POST['password']) ? $_POST['password'] : '';  
$phone = isset($_POST['phone']) ? $_POST['phone'] : '';  
$QQ = isset($_POST['QQ']) ? $_POST['QQ'] : '';  

// 数据验证  
if (empty($username) || empty($password)) {  
    echo json_encode(array("status" => "用户名和密码不能为空"));  
    exit;  
}  

// 检查用户名是否已存在  
$stmt = $conn->prepare("SELECT COUNT(*) FROM users WHERE username = ?");  
$stmt->bind_param("s", $username);  
$stmt->execute();  
$stmt->bind_result($user_count);  
$stmt->fetch();  
$stmt->close();  

if ($user_count > 0) {  
    echo json_encode(array("status" => "用户名已存在"));  
    exit;  
}  

// 密码哈希处理  
$hashed_password = password_hash($password, PASSWORD_DEFAULT);  

// 插入新用户到数据库  
$stmt = $conn->prepare("INSERT INTO users (username, password, phone, QQ) VALUES (?, ?, ?, ?)");  
$stmt->bind_param("ssss", $username, $hashed_password, $phone, $QQ);  

if ($stmt->execute()) {  
    echo json_encode(array("status" => "注册成功"));  
} else {  
    echo json_encode(array("status" => "注册失败，错误代码：" . $conn->error));  
}  

// 关闭数据库连接  
$stmt->close();  
$conn->close();  
?>