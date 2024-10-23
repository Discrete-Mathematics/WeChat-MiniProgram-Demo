<?php  
header('Content-Type: application/json');  

// 获取请求的 JSON 数据  
$data = json_decode(file_get_contents("php://input"), true);  

// 获取用户名和密码  
$username = $data['username'];  
$password = $data['password'];  

// 连接数据库  
$servername = "localhost"; // 数据库服务器  
$dbusername = "root";       // 数据库用户名  
$dbpassword = "";           // 数据库密码  
$dbname = "your_database";  // 数据库名称  

$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);  

// 检查连接  
if ($conn->connect_error) {  
    die("Connection failed: " . $conn->connect_error);  
}  

// 查询用户信息  
$sql = "SELECT * FROM users WHERE username = '$username'";  
$result = $conn->query($sql);  

if ($result->num_rows == 1) {  
    // 找到用户  
    $row = $result->fetch_assoc();  
    
    // 密码匹配，假设存储的密码是加密的，这里需使用实际情况中的加密比较  
    if ($password === $row['password']) { // 注意：实际中应使用密码哈希比较  
        // 登录成功，返回用户信息  
        echo json_encode([  
            'status' => '普通用户登录成功', // 根据具体业务逻辑决定  
            'user' => [  
                'username' => $row['username'],  
                'phone' => $row['phone'],  
                'QQ' => $row['QQ']  
            ]  
        ]);  
    } else {  
        // 密码错误  
        echo json_encode(['status' => '用户名或密码错误']);  
    }  
} else {  
    // 用户不存在  
    echo json_encode(['status' => '用户名或密码错误']);  
}  

// 关闭连接  
$conn->close();  
?>