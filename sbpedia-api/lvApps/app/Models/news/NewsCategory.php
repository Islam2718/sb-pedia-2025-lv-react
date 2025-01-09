<?php

namespace App\Models\news;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NewsCategory extends Model
{
    use HasFactory;

    protected $casts = [
        'status' => 'boolean'        
    ];

    protected $fillable = [      
        'parent_id', 'alias', 'status', 'is_default', 'order'
    ];

    // join with category languages
    public function NewsCategorylanguage()
    {
        return $this->belongsTo(NewsCategoryLanguage::class, 'id', 'news_category_id');
    }
}