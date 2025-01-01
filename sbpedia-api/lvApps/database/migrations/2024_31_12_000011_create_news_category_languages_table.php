<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('news_category_languages', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('news_category_id');
            $table->unsignedBigInteger('setting_language_id');
            $table->string('name')->nullable();
            $table->text('description')->nullable();            
            $table->tinyInteger('is_default')->nullable();
            $table->string('created_by')->nullable();
            $table->string('updated_by')->nullable();            
            $table->dateTime('created')->nullable();
            $table->dateTime('updated')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('news_category_languages');
    }
};
