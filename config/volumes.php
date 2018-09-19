<?php

return [
    'myS3VolumeHandle' => [
        'hasUrls' => true,
        'url' => 'https://'.getenv('S3_BUCKET').'.s3.amazonaws.com/',
        'keyId' => getenv('S3_API_KEY'),
        'secret' => getenv('S3_SECRET'),
        'bucket' => getenv('S3_BUCKET'),
        'region' => getenv('S3_REGION'),
    ],
];
