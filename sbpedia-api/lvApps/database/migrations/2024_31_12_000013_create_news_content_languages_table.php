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
        Schema::create('news_content_languages', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('news_content_id')->nullable();
            $table->unsignedBigInteger('setting_language_id')->nullable();
            $table->string('title')->nullable();
            $table->string('sub_title')->nullable();
            $table->string('name')->nullable();
            $table->text('content')->nullable();
            $table->string('featured_image')->nullable();
            $table->tinyInteger('is_default')->nullable();
            $table->bigInteger('created_by')->nullable();
            $table->bigInteger('updated_by')->nullable();
            $table->dateTime('created')->nullable();
            $table->dateTime('updated')->nullable();
            $table->tinyInteger('status')->nullable();
            $table->bigInteger('activity_id')->nullable();
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
        Schema::dropIfExists('news_content_languages');
    }
};
