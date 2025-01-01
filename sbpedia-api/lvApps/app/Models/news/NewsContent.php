<?php

namespace App\Models\news;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NewsContent extends Model
{
    use HasFactory;

    // fields 
    // person_id
    // alias
    // is_top_news
    // is_featured
    // is_organization_news
    // organization_id
    // is_user_news
    // featured_image
    // tags
    // link_type
    // custom_link
    // is_target_blank
    // order
    // status
    // approve_status
    // publish_date
    // country_id
    // country_name
    // city_name
    // organization_name
    // activity_id
    // live_edited_by
    // is_file
    // file_type
    // file_name
    // created
    // modified

    protected $casts = [
        'person_id' => 'integer',
    ];

    protected $fillable = [
        'news_category_id',
        'title',
        'slug',
        'description',
        'status',
        'is_top_news',
        'is_featured',
        'is_organization_news',
        'organization_id',
        'is_user_news',
        'featured_image',
        'tags',
        'link_type',
        'custom_link',
        'is_target_blank',
        'order',
        'status',
        'approve_status',
        'publish_date',
        'country_id',
        'country_name',
        'city_name',
        'organization_name',
        'activity_id',
        'live_edited_by',
        'is_file',
        'file_type',
        'file_name',
        'created',
        'modified',
    ];

    public function NewsContentLanguage()
    {
        return $this->belongsTo(NewsContentLanguage::class, 'id', 'news_content_id');
    }
}