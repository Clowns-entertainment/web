from setuptools import setup, find_namespace_packages

settings = {
    'name': 'Clowns-Entertainment-Services',
    'description': 'Clowns entertainment services',
    'zip_safe': False,
    'include_package_data': True,
    'packages': find_namespace_packages(include=('.*',)),
    'entry_points': {
        'console_scripts': [
        ],
    },
    'install_requires': [
        'pyzmq',
        'zmq',
        'fastapi_mail'
    ],
}


def main():
    setup(**settings)


if __name__ == '__main__':
    main()