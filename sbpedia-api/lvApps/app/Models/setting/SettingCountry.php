<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SettingCountry extends Model
{
    use HasFactory;
    // /**
    // id
    // code
    // country_name
    // full_name
    // iso3
    // number
    // continent_code

    protected $casts = [
        // 
    ];

    protected $fillable = [
        'id',
        'code',
        'country_name',
        'full_name',
        'iso3',
        'number',
        'continent_code',
    ];
}