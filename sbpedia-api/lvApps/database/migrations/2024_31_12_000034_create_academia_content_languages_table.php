<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    // /**
    //  * fields: 
    //  *academia_content_id
    //     setting_language_id 
    //     title 
    //     name
    //     content
    //     is_default
    //     created_by
    //     updated_by
    //     created
    //     updated
    //     status
    //  */
    public function up()
    {
        Schema::create('academia_content_languages', function (Blueprint $table) {
            $table->id();
            $table->integer('academia_content_id');
            $table->integer('setting_language_id');
            $table->string('title');
            $table->string('name');
            $table->text('content');
            $table->boolean('is_default');
            $table->integer('created_by');
            $table->integer('updated_by');
            $table->integer('status');            
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
        Schema::dropIfExists('academia_content_languages');
    }
};
