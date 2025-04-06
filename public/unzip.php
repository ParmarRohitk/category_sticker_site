<?php
$zipFile = 'out.zip';
$extractTo = __DIR__;

if (!file_exists($zipFile)) {
    die("❌ Zip file '$zipFile' not found.");
}

$zip = new ZipArchive;
if ($zip->open($zipFile) === TRUE) {
    $zip->extractTo($extractTo);
    $zip->close();
    echo "✅ Extraction complete.";

    // Optional: Delete zip after extraction
    unlink($zipFile);
    echo " 🗑️ Deleted $zipFile.";
} else {
    echo "❌ Failed to open zip file.";
}
?>
