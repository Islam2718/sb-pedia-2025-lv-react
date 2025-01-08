<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    // /**
    //  *fields: 
    //     person_id
    //     alias
    //     featured_image
    //     tags
    //     link_type
    //     custom_link
    //     is_target_blank
    //     order
    //     status
    //     activity_id
    //     live_edited_by
    //     is_file
    //     file_type
    //     file_name
    //     country_id
    //     is_top_news
    //     is_featured
    //     is_organization
    //     created
    //     updated     
    //  */
    public function up()
    {
        Schema::create('academia_contents', function (Blueprint $table) {
            $table->id();
            $table->integer('person_id');
            $table->string('alias');
            $table->string('featured_image');
            $table->string('tags');
            $table->string('link_type');
            $table->string('custom_link');
            $table->boolean('is_target_blank');
            $table->integer('order');
            $table->boolean('status');
            $table->integer('activity_id');
            $table->integer('live_edited_by');
            $table->boolean('is_file');
            $table->string('file_type');
            $table->string('file_name');
            $table->integer('country_id');
            $table->boolean('is_top_news');
            $table->boolean('is_featured');
            $table->boolean('is_organization');
            $table->dateTime('created');
            $table->dateTime('updated');
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
        Schema::dropIfExists('academia_contents');
    }
};
