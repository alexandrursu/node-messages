apidoc -i api -o doc -e node_modules
if [ $# -gt 0 ]
  then
    if [ $1 -eq 1 ]
      then
        git commit -am "updating documentation"
        git push
    fi
fi

if [ -d "../rjriel.github.io" ]
  then
    if [ -d "doc" ]
      then
        cp -rf doc/* ../rjriel.github.io/.
        if [ $# -gt 0 ]
          then
            if [ $1 -eq  1 ]
              then
                cd ../rjriel.github.io
                git commit -am "updating documentation"
                git push
            fi
        fi
    fi
fi
