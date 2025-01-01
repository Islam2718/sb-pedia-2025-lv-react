<?php

namespace App\Models\news;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NewsContentLanguage extends Model
{
    use HasFactory;

    protected $casts = [
        'user_id' => 'integer',
        'status' => 'integer',
        'sort_order' => 'integer',
    ];

    protected $fillable = [
        'name',
        'description',
        'thumb',
        'user_id',
        'status',
        'sort_order'
    ];

    public function Category()
    {
        return $this->belongsTo(NewsCategory::class, 'news_category_id');
    }
}