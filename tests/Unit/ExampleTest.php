<?php

use App\Example;

covers(Example::class);

test('it can add two numbers', function () {
    $example = new Example();

    expect($example->add(1, 2))->toBe(3);
});
