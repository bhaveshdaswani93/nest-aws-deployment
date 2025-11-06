@echo off

cd ..

echo Creating deployment package...

powershell -Command "& {
    $exclude = @('node_modules', '.git', 'dist', 'coverage', 'test', '.vscode', '.env*', '*.log')
    $files = Get-ChildItem -Path . -Recurse | Where-Object { 
        $item = $_
        -not ($exclude | Where-Object { $item.FullName -like \"*\$_\*\" })
    }
    Compress-Archive -Path * -DestinationPath nest_aws_deployment.zip -Force -CompressionLevel Optimal
}"

echo Deployment package created: nest_aws_deployment.zip
