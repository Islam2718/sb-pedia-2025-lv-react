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
        // $table->id();
        // $table->unsignedBigInteger('parent_id');
        // $table->string('alias')->nullable();
        // $table->tinyInteger('status')->default(0);
        // $table->tinyInteger('is_default')->default(0);
        // $table->bigInteger('order')->default(0);        
        'parent_id', 'alias', 'status', 'is_default', 'order'
    ];

    // join with category languages 
    public function NewsCategorylanguage()
    {
        return $this->belongsTo(NewsCategoryLanguage::class, 'id', 'news_category_id');
    }
}