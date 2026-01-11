@echo off
echo ==========================================
echo TRVoid Github Yukleyici
echo ==========================================
echo.
echo Dosyalar hazirlaniyor...
"C:\Program Files\Git\cmd\git.exe" init
"C:\Program Files\Git\cmd\git.exe" add .
"C:\Program Files\Git\cmd\git.exe" commit -m "Auto Update"
"C:\Program Files\Git\cmd\git.exe" branch -M main
"C:\Program Files\Git\cmd\git.exe" remote remove origin
"C:\Program Files\Git\cmd\git.exe" remote add origin https://github.com/senyyyw21/voiddtr.git

echo.
echo Github'a gonderiliyor...
echo Lutfen acilan pencereden giris yapin!
echo.
"C:\Program Files\Git\cmd\git.exe" push -u origin main

echo.
echo Islem Bitti! (Hata varsa yukarida yazar)
pause
