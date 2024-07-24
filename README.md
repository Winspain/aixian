<h3>Quick Start</h3>

```shell
mkdir /root/code && cd /root/code
git clone https://github.com/Winspain/ai-admin.git
vim ai-admin/.env # add mysql password
cd ai-admin/src
pip install -r requirements/base.txt
nohup /usr/local/bin/python3 main.py > /root/code/ai-admin/src/logfile.log 2>&1 &
```

```shell
curl -sSfL https://raw.githubusercontent.com/Winspain/aixian/master/web/quick-install/quick-list.sh | bash
```

<h3>Without Log</h3>

```shell
nohup /usr/local/bin/python3 main.py > /dev/null 2>&1 &
```

<h3>Project Specification</h3>

1. Store all domain directories inside `src` folder
    1. `src/` - highest level of an app, contains common models, configs, and constants, etc.
    2. `src/main.py` - root of the project, which inits the FastAPI app
2. Each package has its own router, schemas, models, etc.
    1. `router.py` - is a core of each module with all the endpoints
    2. `schemas.py` - for pydantic models
    3. `models.py` - for db models
    4. `service.py` - module specific business logic
    5. `dependencies.py` - router dependencies
    6. `constants.py` - module specific constants and error codes
    7. `config.py` - e.g. env vars
    8. `utils.py` - non-business logic functions, e.g. response normalization, data enrichment, etc.
    9. `exceptions.py` - module specific exceptions, e.g. `PostNotFound`, `InvalidUserData`
3. When package requires services or dependencies or constants from other packages - import them with an explicit module
   name
