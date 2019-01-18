:loop
	cd X:\Discord Bots\DanBot
        X:
	git init
	git pull
	git add --all
	git commit -m "Automatic - Date: %date% - Time: %time%"
        TIMEOUT 120
	git init
	git pull
	git add --all
	git commit -m "Automatic - Date: %date% - Time: %time%"
        TIMEOUT 120
	git init
	git pull
	git add --all
	git commit -m "Automatic - Date: %date% - Time: %time%"
        TIMEOUT 120
	git init
	git pull
	git add --all
	git commit -m "Automatic - Date: %date% - Time: %time%"
        TIMEOUT 120
	git init
	git pull
	git add --all
	git commit -m "Automatic - Date: %date% - Time: %time%"
        TIMEOUT 120
	git init
	git pull
	git add --all
	git commit -m "Automatic - Date: %date% - Time: %time%"
	git push
	echo Complete!
goto loop