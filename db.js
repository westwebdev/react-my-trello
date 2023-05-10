module.exports = function () {
    return {
        "tasks": {
            "todo" : [
                {
                    "id": 1,
                    "title": "Lorem",
                    "text": "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
                    "status": "todo"
                },
                {
                    "id": 2,
                    "title": "Ipsum",
                    "text": "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
                    "status": "todo"
                },
                {
                    "id": 3,
                    "title": "Maecenas",
                    "text": "Ut augue ex, scelerisque in rhoncus vel, porta nec augue. Maecenas consequat tempus libero.",
                    "status": "todo"
                },
                {
                    "id": 4,
                    "title": "Praesent",
                    "text": "Praesent nec rutrum nunc, in luctus diam. Nullam in odio sit amet dolor scelerisque mollis. Praesent facilisis ullamcorper feugiat.",
                    "status": "todo"
                }
            ],
            "inProcess": [
                {
                    "id": 5,
                    "title": "Suscipit",
                    "text": "Nunc interdum lorem id sapien suscipit, et imperdiet ipsum pellentesque.",
                    "status": "inProcess"
                },
                {
                    "id": 6,
                    "title": "Nullam",
                    "text": "Nullam eget diam augue. Curabitur ut congue lectus. Donec nec efficitur diam. Suspendisse mauris felis, scelerisque ac orci ac, tempus consectetur magna. Pellentesque eu neque lacinia, gravida massa a, varius libero.",
                    "status": "inProcess"
                }
            ]
        },
        "taskStatus": [
            {
                "id": "todo",
                "title": "Todo",
                "color": "gray.300"
            },
            {
                "id": "inProcess",
                "title": "In Process",
                "color": "yellow.300"
            },
            {
                "id": "testing",
                "title": "Testing",
                "color": "orange.300"
            },
            {
                "id": "done",
                "title": "Done",
                "color": "green.300"
            }
        ],
        "taskColors": [
            {
                "id": "redColor",
                "name": "Red",
                "value": "red.300"
            },
            {
                "id": "purpleColor",
                "name": "Purple",
                "value": "purple.300"
            },
            {
                "id": "blueColor",
                "name": "Blue",
                "value": "blue.300"
            },
            {
                "id": "tealColor",
                "name": "Teal",
                "value": "teal.300"
            },
            {
                "id": "pinkColor",
                "name": "Pink",
                "value": "pink.300"
            },
            {
                "id": "yellowColor",
                "name": "Yellow",
                "value": "yellow.300"
            },
            {
                "id": "orangeColor",
                "name": "Orange",
                "value": "orange.300"
            },
            {
                "id": "greenColor",
                "name": "Green",
                "value": "green.300"
            },
            {
                "id": "grayColor",
                "name": "Gray",
                "value": "gray.300"
            }
        ]
    }
}