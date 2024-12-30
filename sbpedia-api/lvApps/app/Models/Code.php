<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Code extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'email',
        'code',
        'request_url',
        'is_active',
        'expire_at'
    ];
}
