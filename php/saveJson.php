<?php
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    @$content = $request->content;
    @$filename = $request->filename;
    file_put_contents('../json/' . $filename,json_encode($content));
?>