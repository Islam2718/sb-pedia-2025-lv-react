<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class People extends Model
{
    use HasFactory;
    // /**
    //  *fields: 
    // signup_category_id
    // signup_sub_category_id
    // first_name
    // last_name
    // sur_name
    // username
    // email
    // identity
    // full_name
    // email
    // gender
    // organization_name
    // organization_id
    // dob
    // profile_image
    // cover_image
    // online_profile
    // interested_in
    // about_myself
    // created
    // updated
    // facebook
    // twitter
    // linkedin
    // google_plus
    // status
    // is_organization_root_user

    protected $casts = [
        // 
    ];

    protected $fillable = [
        'first_name',
        'last_name',
        'sur_name',
        'username',
        'email',
        'identity',
        'full_name',
        'email',
        'gender',
        'organization_name',
        'organization_id',
        'dob',
        'profile_image',
        'cover_image',
        'online_profile',
        'interested_in',
        'about_myself',
        'created',
        'updated',
        'facebook',
        'twitter',
        'linkedin',
        'google_plus',
        'status',
        'is_organization_root_user',
        'signup_category_id',
        'signup_sub_category_id'
    ];

    // public function user()
    // {
    //     return $this->belongsTo(User::class, 'user_id');
    // }
}