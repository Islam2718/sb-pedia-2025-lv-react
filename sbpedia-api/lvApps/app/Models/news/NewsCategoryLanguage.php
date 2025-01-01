<?php

namespace App\Models\news;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NewsCategoryLanguage extends Model
{
    use HasFactory;

    // news_category_id
    // setting_language_id
    // name
    // description
    // is_default
    // created_by
    // updated_by
    // created
    // updated

    protected $casts = [
        'id' => 'integer',
    ];

    protected $fillable = [
        'news_category_id',
        'setting_language_id',
        'name',
        'description',
        'is_default',
        'created_by',
        'updated_by',
        'created',
        'updated',        
    ];

    public function Category()
    {
        return $this->belongsTo(NewsCategory::class, 'news_category_id');
    }
}