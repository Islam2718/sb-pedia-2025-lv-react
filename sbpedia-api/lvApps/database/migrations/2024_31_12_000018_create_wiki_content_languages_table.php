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
        Schema::create('wiki_content_languages', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('wiki_content_id')->nullable();
            $table->bigInteger('setting_language_id')->nullable(); 
            $table->string('title')->nullable();           
            $table->string('name')->nullable();
            $table->text('content')->nullable();
            $table->tinyInteger('is_default')->nullable();
            $table->bigInteger('created_by')->nullable();
            $table->bigInteger('updated_by')->nullable();
            $table->dateTime('created')->nullable();
            $table->dateTime('updated')->nullable();
            $table->string('status')->nullable();
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
        Schema::dropIfExists('wiki_content_languages');
    }
};
