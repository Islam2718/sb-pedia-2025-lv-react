<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SettingLanguage extends Model
{
    use HasFactory;
    // /**
    // id
    // name
    // native_name
    // code
    // description
    // direction
    // status

    protected $casts = [
        // 
    ];

    protected $fillable = [
        'id',
        'name',
        'native_name',
        'code',
        'description',
        'direction',
        'status',
    ];
}