<?php
// 這個文件僅作為後備使用，實際處理會由Node.js服務器完成
header('Content-Type: application/json');
echo json_encode([
    'success' => false,
    'errors' => ['服務器未運行，請先啟動Node.js服務器']
]);
?>