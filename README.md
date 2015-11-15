# mqttRetainedMessageRetriever

WebAPI to get a MQTT retained message.

# Demo End point

https://mqtt-retained-message-retriever.switchdevice.com

# How to use

## Normal (Non encrypted configuration)

### /mqtt/retrieve

Arguments:

Argument|desc|sample
---|---|---
host|MQTT broker host name|test.mosquitto.org
port|Port number|1883
username|user name|dummyuser
password|password |dummypassword"
topic|topic to subscribe|topic/subtopic

Return:

Retained message(String)

Example:

Argument|Example
---|---
host|test.mosquitto.org
port|1883
topic|mqttRetainedMessageRetriever

    $ curl 'https://mqtt-retained-message-retriever.switchdevice.com/mqtt/retrieve?host=test.mosquitto.org&port=1883&topic=mqttRetainedMessageRetriever'
    "hoge"

## Encrypted configuration

You need to encrypt JSON file by a tool located in "tools/encrypt/".

    $ curl 'https://mqtt-retained-message-retriever.switchdevice.com/app/password'
    {"key":"hogar-auhah-joqim-waguj-qatof","password":"QU?cP1iXpFOOBART4o7u2HOGERNO6TRjjWh_hogera"}

    $ cd tools/encrypt
    $ cat sample.json | node encrypt -p QU?cP1iXpFOOBART4o7u2HOGERNO6TRjjWh_hogera
    VTJGc2RHVmtYMS9JVDNKUVJTUjVHTm11RmUxZkd4Mm5XYmtSUDBYbHFLVlo5QjhJVks3dVpleWVuU1hGQUFHUUNoVXl0K2ZxZ3FYS0tLOUpUdHZ4aVYwaWZhdlExS1piQXgxK1lwQmlXMDhmdzNwUG53d2xPalZvb3JmVjQ1SnVzQTVkK2Znc01qUG1XaVBobERXMjFBPT0=

    $ curl 'https://mqtt-retained-message-retriever.switchdevice.com/mqtt/retrieve?encrypted=VTJGc2RHVmtYMS9JVDNKUVJTUjVHTm11RmUxZkd4Mm5XYmtSUDBYbHFLVlo5QjhJVks3dVpleWVuU1hGQUFHUUNoVXl0K2ZxZ3FYS0tLOUpUdHZ4aVYwaWZhdlExS1piQXgxK1lwQmlXMDhmdzNwUG53d2xPalZvb3JmVjQ1SnVzQTVkK2Znc01qUG1XaVBobERXMjFBPT0=&apikey=futeq-jepoj-vepaw-levaj-samum'
    "hoge"

### /app/password

Return

{"key":apikey(String),"password":password(String)}

Example:

    $ curl 'https://mqtt-retained-message-retriever.switchdevice.com/app/password'
    {"key":"hogar-auhah-joqim-waguj-qatof","password":"QU?cP1iXpFOOBART4o7u2HOGERNO6TRjjWh_hogera"}

### /mqtt/retrieve

Arguments:

Argument|desc|sample
---|---|---
apikey|API key for encrypted conf|aaaaa-aaaaa-aaaaa-aaaaa-aaaaa
encrypted|encrypted data|XXXXX
topic|topic to subscribe|topic/subtopic

Example:


    $ curl 'https://mqtt-retained-message-retriever.switchdevice.com/mqtt/retrieve?encrypted=VTJGc2RHVmtYMS9JVDNKUVJTUjVHTm11RmUxZkd4Mm5XYmtSUDBYbHFLVlo5QjhJVks3dVpleWVuU1hGQUFHUUNoVXl0K2ZxZ3FYS0tLOUpUdHZ4aVYwaWZhdlExS1piQXgxK1lwQmlXMDhmdzNwUG53d2xPalZvb3JmVjQ1SnVzQTVkK2Znc01qUG1XaVBobERXMjFBPT0=&apikey=futeq-jepoj-vepaw-levaj-samum'
    "hoge"

# LICENSE

This software is released under the MIT License, see LICENSE.txt.


# Copyright

[@ikeyasu](https://twitter.com/ikeyasu)
https://github.com/ikeyasu
