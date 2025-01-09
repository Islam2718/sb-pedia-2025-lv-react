<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SocialProfile extends Model
{
    use HasFactory;
    // /**
    //  *fields: 
    //     user_id
    //     provider
    //     access_token
    //     identifier
    //     username
    //     first_name
    //     last_name
    //     full_name
    //     email
    //     birth_date
    //     gender
    //     picture_url
    //     email_verified
    //     created
    //     modified
    //     timestamps
    //  */

    protected $casts = [
        'created' => 'datetime',
        'modified' => 'datetime',
        'email_verified' => 'boolean',        
    ];

    protected $fillable = [
        'user_id',
        'provider',
        'access_token',
        'identifier',
        'username',
        'first_name',
        'last_name',
        'full_name',
        'email',
        'birth_date',
        'gender',
        'picture_url',
        'email_verified',
        'created',
        'modified',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}